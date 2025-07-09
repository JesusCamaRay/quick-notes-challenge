"use client";

import { getNotes } from "@/lib/actions";
import { Note } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Notes() {
  const { data: notes, isLoading } = useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: async () => {
      const notes = await getNotes();
      return notes;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Notes</CardTitle>
        <CardDescription>
          Here are the notes you&apos;ve created.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {notes?.map((note) => (
          <Card key={note.id}>
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{note.content}</p>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
