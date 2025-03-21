'use client';

import { useEffect, useState } from 'react';
import { getAllResources } from '@/actions/resource';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const ResourcesPage = () => {
    const [resources, setResources] = useState<
        { id: string; title: string; description: string; category: string; tags: string[]; fileUrl: string }[]
    >([]);
    const [loading, setLoading] = useState(true);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await getAllResources();
                if (response.success) {
                    setResources(response.resources);
                } else {
                    toast.error('Failed to fetch resources');
                }
            } catch (error) {
                toast.error('Something went wrong while fetching resources');
            } finally {
                setLoading(false);
            }
        };

        fetchResources();
    }, []);

    const sortedResources = [...resources];
    if (sortConfig !== null) {
        sortedResources.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }

    const filteredResources = sortedResources.filter((resource) =>
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const requestSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">All Resources</h1>
            <div className="mb-4 flex items-center">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border p-2 mr-2"
                />
                <Button onClick={() => setSearchQuery('')}>Clear</Button>
            </div>
            {loading ? (
                <div className="flex justify-center items-center">
                    <Loader2 className="w-8 h-8 animate-spin" />
                </div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead onClick={() => requestSort('title')}>Title</TableHead>
                            <TableHead onClick={() => requestSort('description')}>Description</TableHead>
                            <TableHead onClick={() => requestSort('category')}>Category</TableHead>
                            <TableHead onClick={() => requestSort('tags')}>Tags</TableHead>
                            <TableHead>File</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredResources.map((resource) => (
                            <TableRow key={resource.id}>
                                <TableCell className="font-medium">{resource.title}</TableCell>
                                <TableCell>{resource.description}</TableCell>
                                <TableCell>{resource.category}</TableCell>
                                <TableCell>
                                    {resource.tags.map((tag) => (
                                        <Badge key={tag} className="mr-1">{tag}</Badge>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    <Link href={resource.fileUrl} target="_blank">
                                        <Button variant="outline" size="sm">View File</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};

export default ResourcesPage;
