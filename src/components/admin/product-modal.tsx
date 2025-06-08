"use client";
import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UploadButton } from "@/components/ui/uploadthing";

const productSchema = z.object({
  amazonLink: z.string().url(),
  title: z.string().min(2),
  description: z.string().min(5),
  image: z.string().url(),
  price: z.coerce.number().min(0),
  categoryId: z.string().min(1),
  affiliateId: z.string().min(1),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ProductFormValues) => Promise<void>;
  initialValues?: Partial<ProductFormValues>;
  categories: { id: string; name: string }[];
  loading?: boolean;
}

export function ProductModal({
  open,
  onOpenChange,
  onSubmit,
  initialValues = {},
  categories,
  loading,
}: ProductModalProps) {
  const [imageUrl, setImageUrl] = React.useState(initialValues.image || "");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialValues as ProductFormValues,
  });

  React.useEffect(() => {
    reset(initialValues as ProductFormValues);
    setImageUrl(initialValues.image || "");
  }, [initialValues, open, reset]);

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
    setValue("image", url, { shouldValidate: true });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{initialValues ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(async (values) => {
            await onSubmit({ ...values, image: imageUrl });
            onOpenChange(false);
          })}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="amazonLink">Amazon Link</Label>
            <Input id="amazonLink" {...register("amazonLink")}/>
            {errors.amazonLink && <p className="text-red-500 text-xs">{errors.amazonLink.message}</p>}
          </div>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")}/>
            {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")}/>
            {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
          </div>
          <div>
            <Label htmlFor="image">Image</Label>
            {imageUrl && <img src={imageUrl} alt="Product" className="w-24 h-24 object-cover mb-2 rounded" />}
            <UploadButton
              endpoint="productImage"
              onClientUploadComplete={(res) => {
                if (res && res[0]?.url) handleImageUpload(res[0].url);
              }}
              onUploadError={(error) => alert(error.message)}
            />
            <Input type="hidden" {...register("image")} value={imageUrl} />
            {errors.image && <p className="text-red-500 text-xs">{errors.image.message}</p>}
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input id="price" type="number" step="0.01" {...register("price")}/>
            {errors.price && <p className="text-red-500 text-xs">{errors.price.message}</p>}
          </div>
          <div>
            <Label htmlFor="categoryId">Category</Label>
            <select id="categoryId" {...register("categoryId")} className="w-full border rounded px-2 py-1">
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.categoryId && <p className="text-red-500 text-xs">{errors.categoryId.message}</p>}
          </div>
          <div>
            <Label htmlFor="affiliateId">Affiliate ID</Label>
            <Input id="affiliateId" {...register("affiliateId")}/>
            {errors.affiliateId && <p className="text-red-500 text-xs">{errors.affiliateId.message}</p>}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : initialValues ? "Save Changes" : "Add Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 