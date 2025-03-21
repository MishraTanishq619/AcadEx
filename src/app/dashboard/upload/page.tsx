"use client";
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Select from 'react-select'; // Import react-select
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createResource } from '@/actions/resource';
import { getAllCategories } from '@/actions/category';
import { getAllTags } from '@/actions/tag';
import { uploadFileToS3 } from '@/actions/S3';
import useFetch from '@/hooks/use-fetch';

const resourceSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  file: z.custom<File>((file) => file instanceof File, {
    message: 'A file is required',
  }),
  categoryId: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).nonempty('At least one tag is required'),
});

type ResourceFormValues = z.infer<typeof resourceSchema>;

const UploadPage = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [tags, setTags] = useState<{ id: string; name: string }[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ResourceFormValues>({
    resolver: zodResolver(resourceSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      const categoryRes = await getAllCategories();
      const tagRes = await getAllTags();

      if (categoryRes.success) setCategories(categoryRes.categories || []);
      if (tagRes.success) setTags(tagRes.tags || []);
    };

    fetchData();
  }, []);

    const { data, fn:createResourcefn, loading} = useFetch(createResource);

  const onSubmit = async (data: ResourceFormValues) => {
    try {
      const fileUrl = await uploadFileToS3(data.file);
      if (!fileUrl) throw new Error('File upload failed');

      createResourcefn({
        title: data.title,
        description: data.description,
        fileUrl,
        categoryId: data.categoryId,
        tags: data.tags, // Ensure this is passed as an array
      });
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    if (data) {
      if (data.success) {
        toast.success('Resource uploaded successfully');
        router.push('/dashboard');
      } else {
        toast.error(data.message);
      }
    }
  
  }, [data])
  

  return (
		<div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
			<h1 className="text-xl font-bold mb-4">Upload New Resource</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<Input placeholder="Title" {...register("title")} />
				{errors.title && (
					<p className="text-red-500">{errors.title.message}</p>
				)}

				<Textarea
					placeholder="Description"
					{...register("description")}
				/>
				{errors.description && (
					<p className="text-red-500">{errors.description.message}</p>
				)}

				<Input
					type="file"
					onChange={(e) => setValue("file", e.target.files?.[0])}
				/>
				{errors.file && (
					<p className="text-red-500">{errors.file.message}</p>
				)}

				{/* Single Select for Category */}
				<select
					{...register("categoryId")}
					className="w-full p-2 border rounded"
				>
					<option value="">Select a Category</option>
					{categories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</select>
				{errors.categoryId && (
					<p className="text-red-500">{errors.categoryId.message}</p>
				)}

				{/* Multi-Select for Tags */}
				<Controller
					control={control}
					name="tags"
					render={({ field }) => (
						<Select
							{...field}
							isMulti
							options={tags.map((tag) => ({
								value: tag.id,
								label: tag.name,
							}))}
							value={field.value
								?.map((id) => tags.find((tag) => tag.id === id))
								?.map((tag) => ({
									value: tag?.id,
									label: tag?.name,
								}))}
							onChange={(selected) =>
								field.onChange(
									selected.map((option) => option.value)
								)
							}
							className="basic-multi-select"
							classNamePrefix="select"
						/>
					)}
				/>
				{errors.tags && (
					<p className="text-red-500">{errors.tags.message}</p>
				)}

				<Button type="submit">Upload</Button>
			</form>
		</div>
  );
};

export default UploadPage;
