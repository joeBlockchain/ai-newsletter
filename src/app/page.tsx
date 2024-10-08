import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import BlogPostCard from "@/components/blog-post-card";
import { Separator } from "@/components/ui/separator";
import { getBlogPosts } from "@/lib/actions";
import { Bird } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const pageSize = 10;

  const { posts: blogPosts, total } = await getBlogPosts(currentPage, pageSize);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // Generate an array of page numbers to display
  const pageNumbers = [];
  const maxVisiblePages = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <main className="max-w-7xl mx-auto min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
      <nav>
        <SiteHeader />
      </nav>
      <div>
        <section className="flex flex-col w-full items-center px-5 py-[5rem] gap-4">
          <div className="flex flex-col justify-center space-y-4">
            <div className="mx-3 space-y-2 lg:space-y-3 max-w-md md:max-w-2xl lg:max-w-3xl">
              <div className="flex items-center justify-center">
                <Bird className="w-16 h-16 " />
              </div>
              <h1 className="leading-tight lg::leading-snug font-black text-5xl lg:text-7xl ">
                AI News on the Cheep
              </h1>
              <p className="leading-normal text-xl text-muted-foreground">
                Don&apos;t miss out on the latest AI news. Get the latest news
                summarized by ChatGPT 4o Mini.
              </p>
            </div>
            <div className="flex flex-row items-center space-x-4 pt-4">
              {/* <Button
                asChild
                variant="default"
                className="mx-3 w-40 text-lg h-12 lg:h-14 lg:rounded-lg lg:text-xl"
              >
                <Link href="/signin/password_signin">Get Started</Link>
              </Button> */}
              {/* <Button
              asChild
              variant="outline"
              className="mx-3 w-40 text-lg h-12 lg:h-14 lg:rounded-xl lg:text-xl"
            >
              <Link href="/login">Learn More</Link>
            </Button> */}
            </div>
          </div>
        </section>

        <section className="flex flex-col w-full items-center px-5">
          {blogPosts && blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {blogPosts.map((post) => (
                <div key={post.id}>
                  <BlogPostCard post={post} />
                  <Separator className="w-full" />
                </div>
              ))}
            </div>
          ) : (
            <p>No blog posts found.</p>
          )}

          {/* Pagination */}
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={currentPage > 1 ? `/?page=${currentPage - 1}` : "#"}
                  aria-disabled={currentPage === 1}
                />
              </PaginationItem>
              {startPage > 1 && (
                <>
                  <PaginationItem>
                    <PaginationLink href="/?page=1">1</PaginationLink>
                  </PaginationItem>
                  {startPage > 2 && <PaginationEllipsis />}
                </>
              )}
              {pageNumbers.map((pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href={`/?page=${pageNumber}`}
                    isActive={pageNumber === currentPage}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {endPage < totalPages && (
                <>
                  {endPage < totalPages - 1 && <PaginationEllipsis />}
                  <PaginationItem>
                    <PaginationLink href={`/?page=${totalPages}`}>
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}
              <PaginationItem>
                <PaginationNext
                  href={
                    currentPage < totalPages ? `/?page=${currentPage + 1}` : "#"
                  }
                  aria-disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
