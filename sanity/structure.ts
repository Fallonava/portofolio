import { FolderKanban, Briefcase, MessageSquareQuote } from 'lucide-react';

export const structure = (S: any) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Projects')
        .icon(FolderKanban)
        .child(S.documentTypeList('project').title('Projects')),
      
      S.divider(),
      
      S.listItem()
        .title('Experience')
        .icon(Briefcase)
        .child(S.documentTypeList('experience').title('Work Experience')),
        
      S.listItem()
        .title('Testimonials')
        .icon(MessageSquareQuote)
        .child(S.documentTypeList('testimonial').title('Testimonials')),
    ]);
