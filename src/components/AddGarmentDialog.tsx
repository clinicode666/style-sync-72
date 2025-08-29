import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Camera, Upload, X } from "lucide-react";
import { useGarments } from "@/hooks/useGarments";
import { toast } from "@/hooks/use-toast";

interface AddGarmentDialogProps {
  trigger?: React.ReactNode;
}

const AddGarmentDialog = ({ trigger }: AddGarmentDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  
  const [formData, setFormData] = useState({
    type: "",
    subtype: "",
    color_primary: "",
    color_secondary: "",
    pattern: "",
    material: "",
    fit: "",
    formality: 5,
    warmth: 5,
    season: [] as string[]
  });

  const { addGarment, uploadGarmentImage } = useGarments();

  const garmentTypes = [
    "camisa", "camiseta", "blusa", "sueter", "casaco", "jaqueta", "blazer",
    "calca", "jeans", "saia", "short", "vestido",
    "sapato", "tenis", "sandalia", "bota",
    "acessorio", "bolsa", "cinto", "chapeu"
  ];

  const colors = [
    "branco", "preto", "cinza", "azul", "vermelho", "verde", "amarelo",
    "rosa", "roxo", "laranja", "marrom", "bege", "vinho", "azul-marinho"
  ];

  const seasons = ["primavera", "verão", "outono", "inverno"];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setPreviewUrl("");
  };

  const handleSeasonToggle = (season: string) => {
    setFormData(prev => ({
      ...prev,
      season: prev.season.includes(season)
        ? prev.season.filter(s => s !== season)
        : [...prev.season, season]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageFile) {
      toast({
        title: "Imagem obrigatória",
        description: "Por favor, adicione uma foto da peça.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.type || !formData.color_primary) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha pelo menos o tipo e cor principal.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Upload image first
      const imageUrl = await uploadGarmentImage(imageFile);
      if (!imageUrl) {
        throw new Error("Failed to upload image");
      }

      // Create garment
      await addGarment({
        ...formData,
        color_secondary: formData.color_secondary === "none" ? null : formData.color_secondary,
        image_url: imageUrl,
        last_worn: undefined
      });

      // Reset form and close dialog
      setFormData({
        type: "",
        subtype: "",
        color_primary: "",
        color_secondary: "",
        pattern: "",
        material: "",
        fit: "",
        formality: 5,
        warmth: 5,
        season: []
      });
      setImageFile(null);
      setPreviewUrl("");
      setOpen(false);
      
    } catch (error) {
      console.error('Error adding garment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="luxury" size="lg" className="gap-3">
            <Camera className="h-5 w-5" />
            Adicionar Nova Peça
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="neuro border-0 bg-card/95 backdrop-blur-md max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground">Adicionar Nova Peça</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-3">
            <Label className="text-foreground">Foto da Peça *</Label>
            {previewUrl ? (
              <div className="relative">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-full h-48 object-cover rounded-lg neuro-inset"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer neuro-inset bg-background/50 hover:bg-background/70 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Clique para upload</span> ou arraste a imagem
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG ou JPEG</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Type */}
            <div className="space-y-2">
              <Label className="text-foreground">Tipo *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger className="neuro border-0 bg-background/50 text-foreground">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {garmentTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Subtype */}
            <div className="space-y-2">
              <Label className="text-foreground">Subtipo</Label>
              <Input
                value={formData.subtype}
                onChange={(e) => setFormData(prev => ({ ...prev, subtype: e.target.value }))}
                placeholder="Ex: manga longa, gola V"
                className="neuro border-0 bg-background/50 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Primary Color */}
            <div className="space-y-2">
              <Label className="text-foreground">Cor Principal *</Label>
              <Select value={formData.color_primary} onValueChange={(value) => setFormData(prev => ({ ...prev, color_primary: value }))}>
                <SelectTrigger className="neuro border-0 bg-background/50 text-foreground">
                  <SelectValue placeholder="Selecione a cor" />
                </SelectTrigger>
                <SelectContent>
                  {colors.map(color => (
                    <SelectItem key={color} value={color}>
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Secondary Color */}
            <div className="space-y-2">
              <Label className="text-foreground">Cor Secundária</Label>
              <Select value={formData.color_secondary} onValueChange={(value) => setFormData(prev => ({ ...prev, color_secondary: value }))}>
                <SelectTrigger className="neuro border-0 bg-background/50 text-foreground">
                  <SelectValue placeholder="Cor secundária (opcional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Nenhuma</SelectItem>
                  {colors.map(color => (
                    <SelectItem key={color} value={color}>
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Material */}
            <div className="space-y-2">
              <Label className="text-foreground">Material</Label>
              <Input
                value={formData.material}
                onChange={(e) => setFormData(prev => ({ ...prev, material: e.target.value }))}
                placeholder="Ex: algodão, seda, couro"
                className="neuro border-0 bg-background/50 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Pattern */}
            <div className="space-y-2">
              <Label className="text-foreground">Estampa</Label>
              <Input
                value={formData.pattern}
                onChange={(e) => setFormData(prev => ({ ...prev, pattern: e.target.value }))}
                placeholder="Ex: listrado, floral, liso"
                className="neuro border-0 bg-background/50 text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Fit */}
          <div className="space-y-2">
            <Label className="text-foreground">Caimento</Label>
            <Select value={formData.fit} onValueChange={(value) => setFormData(prev => ({ ...prev, fit: value }))}>
              <SelectTrigger className="neuro border-0 bg-background/50 text-foreground">
                <SelectValue placeholder="Selecione o caimento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="justo">Justo</SelectItem>
                <SelectItem value="regular">Regular</SelectItem>
                <SelectItem value="folgado">Folgado</SelectItem>
                <SelectItem value="oversized">Oversized</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Formality and Warmth */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-foreground">Formalidade (1-10)</Label>
              <Input
                type="number"
                min="1"
                max="10"
                value={formData.formality}
                onChange={(e) => setFormData(prev => ({ ...prev, formality: parseInt(e.target.value) || 5 }))}
                className="neuro border-0 bg-background/50 text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">Aquecimento (1-10)</Label>
              <Input
                type="number"
                min="1"
                max="10"
                value={formData.warmth}
                onChange={(e) => setFormData(prev => ({ ...prev, warmth: parseInt(e.target.value) || 5 }))}
                className="neuro border-0 bg-background/50 text-foreground"
              />
            </div>
          </div>

          {/* Seasons */}
          <div className="space-y-3">
            <Label className="text-foreground">Estações do Ano</Label>
            <div className="flex flex-wrap gap-2">
              {seasons.map(season => (
                <Button
                  key={season}
                  type="button"
                  variant={formData.season.includes(season) ? "luxury" : "luxury-outline"}
                  size="sm"
                  onClick={() => handleSeasonToggle(season)}
                >
                  {season.charAt(0).toUpperCase() + season.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="luxury-outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="luxury"
              disabled={loading}
              className="flex-1"
            >
              {loading ? "Adicionando..." : "Adicionar Peça"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGarmentDialog;