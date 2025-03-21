'use client';

import { useEffect, useState } from 'react';
import { getUserDetails } from '@/actions/user';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { getUserResources } from '@/actions/resource';

const DashboardPage = () => {
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [resources, setResources] = useState<
    { id: string; title: string; description: string; category: string; tags: string[]; fileUrl: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userData = await getUserDetails();
        if (!userData.success) {
          toast.error('Failed to fetch user details');
          return;
        }
        setUser(userData?.user || null);

        const userResources = await getUserResources();
        if (userResources.success) {
            console.log("userResources : ",userResources)
          setResources(userResources.resources || []);
        } else {
          toast.error('Failed to fetch user resources');
        }
      } catch {
        toast.error('Something went wrong while fetching dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <>
          {user && (
            <div className="mb-6 p-4 bg-white shadow rounded-lg">
              <h2 className="text-lg font-semibold">User Details</h2>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p>
                <strong>Role:</strong> <Badge variant="outline">{user.role}</Badge>
              </p>
            </div>
          )}

          <h2 className="text-xl font-semibold mb-2">Your Uploaded Resources</h2>

          {resources.length === 0 ? (
            <p>No resources uploaded yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>File</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resources.map((resource) => (
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
        </>
      )}
    </div>
  );
};

export default DashboardPage;
