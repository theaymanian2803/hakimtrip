import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useExcursions } from '@/contexts/ExcursionsContext';
import { Excursion, ExcursionInput } from '@/types/excursion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, 
  DialogTrigger, DialogFooter, DialogClose
} from '@/components/ui/dialog';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { 
  Compass, LogOut, Plus, Trash2, Image as ImageIcon, Pencil,
  DollarSign, Tag, X
} from 'lucide-react';
import { toast } from 'sonner';

const categories = ['Desert', 'Mountains', 'Coastal', 'City', 'Nature', 'Culinary', 'Cultural', 'Adventure'];

export default function Admin() {
  const { logout } = useAuth();
  const { excursions, addExcursion, updateExcursion, deleteExcursion } = useExcursions();
  const navigate = useNavigate();

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [formData, setFormData] = useState<ExcursionInput>({
    title: '',
    price: 0,
    description: '',
    category: '',
    imageUrl: '',
    images: [],
  });

  const resetForm = () => {
    setFormData({ title: '', price: 0, description: '', category: '', imageUrl: '', images: [] });
    setNewImageUrl('');
    setEditingId(null);
    setIsAddingNew(false);
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const addImageToList = () => {
    const url = newImageUrl.trim();
    if (!url) return;
    if (formData.images.includes(url)) {
      toast.error('This image URL is already added');
      return;
    }
    setFormData(prev => ({ ...prev, images: [...prev.images, url] }));
    setNewImageUrl('');
  };

  const removeImageFromList = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.price || !formData.description || !formData.category || !formData.imageUrl) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      if (editingId) {
        await updateExcursion(editingId, formData);
        toast.success('Excursion updated successfully!');
      } else {
        await addExcursion(formData);
        toast.success('Excursion added successfully!');
      }
      resetForm();
    } catch {
      toast.error(editingId ? 'Failed to update excursion. Please try again.' : 'Failed to add excursion. Please try again.');
    }
  };

  const handleEdit = (excursion: Excursion) => {
    setFormData({
      title: excursion.title,
      price: excursion.price,
      description: excursion.description,
      category: excursion.category,
      imageUrl: excursion.imageUrl,
      images: excursion.images || [],
    });
    setEditingId(excursion.id);
    setIsAddingNew(true);
    requestAnimationFrame(() => {
      document.getElementById('excursion-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleDelete = async (id: string, title: string) => {
    try {
      await deleteExcursion(id);
      toast.success(`"${title}" deleted successfully`);
    } catch {
      toast.error(`Failed to delete "${title}". Please try again.`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <header className="bg-card shadow-soft sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-8 h-8 text-primary" />
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Marrakech Escapes</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="text-destructive hover:text-destructive hover:bg-destructive/10">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card border-0">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Excursions</p>
                  <p className="font-display text-3xl font-bold text-foreground">{excursions.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Compass className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Categories</p>
                  <p className="font-display text-3xl font-bold text-foreground">
                    {new Set(excursions.map(e => e.category)).size}
                  </p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Tag className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Avg. Price</p>
                  <p className="font-display text-3xl font-bold text-foreground">
                    ${excursions.length ? Math.round(excursions.reduce((a, e) => a + e.price, 0) / excursions.length) : 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-gold" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Excursions List */}
        <Card className="shadow-card border-0">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display text-2xl">Excursions</CardTitle>
            <Button onClick={() => setIsAddingNew(true)} className="bg-primary hover:bg-terracotta-dark text-primary-foreground rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Add Excursion
            </Button>
          </CardHeader>
          <CardContent>
            {/* Add New Form */}
            {isAddingNew && (
              <div id="excursion-form" className="mb-8 p-6 bg-secondary rounded-2xl animate-fade-in">
                <h3 className="font-display text-lg font-semibold mb-4">
                  {editingId ? 'Edit Excursion' : 'Add New Excursion'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Sahara Desert Adventure"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="price"
                          type="number"
                          min="1"
                          value={formData.price || ''}
                          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                          placeholder="299"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Main Image */}
                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">Main Cloudflare Image URL</Label>
                    <div className="relative">
                      <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="imageUrl"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        placeholder="https://your-cloudflare-url.com/main-image.jpg"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Gallery Images */}
                  <div className="space-y-3">
                    <Label>Gallery Images (optional)</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          value={newImageUrl}
                          onChange={(e) => setNewImageUrl(e.target.value)}
                          placeholder="Paste additional image URL..."
                          className="pl-10"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') { e.preventDefault(); addImageToList(); }
                          }}
                        />
                      </div>
                      <Button type="button" variant="outline" onClick={addImageToList}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Image preview list */}
                    {formData.images.length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-2">
                        {formData.images.map((img, i) => (
                          <div key={i} className="relative group w-20 h-20 rounded-lg overflow-hidden ring-1 ring-border">
                            <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeImageFromList(i)}
                              className="absolute inset-0 bg-destructive/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                            >
                              <X className="w-4 h-4 text-destructive-foreground" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {formData.images.length} gallery image{formData.images.length !== 1 ? 's' : ''} added
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe this excursion in detail..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="bg-primary hover:bg-terracotta-dark text-primary-foreground">
                      {editingId ? (
                        <>
                          <Pencil className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Excursion
                        </>
                      )}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Excursions Table */}
            <div className="space-y-4">
              {excursions.map((excursion) => (
                <div
                  key={excursion.id}
                  className="flex items-center gap-4 p-4 bg-background rounded-xl hover:shadow-soft transition-shadow"
                >
                  <img
                    src={excursion.imageUrl}
                    alt={excursion.title}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate">{excursion.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {excursion.category} • ${excursion.price} • {(excursion.images?.length || 0) + 1} images
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {excursion.description.slice(0, 100)}...
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-primary hover:text-primary hover:bg-primary/10"
                      onClick={() => handleEdit(excursion)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete Excursion</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete "{excursion.title}"? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button variant="destructive" onClick={() => handleDelete(excursion.id, excursion.title)}>
                              Delete
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}

              {excursions.length === 0 && (
                <div className="text-center py-12">
                  <Compass className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">No excursions yet. Add your first one!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
