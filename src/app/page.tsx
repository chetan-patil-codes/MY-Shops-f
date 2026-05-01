import { FlipkartHome } from "@/components/flipkart-home";
import { getCategories, getHomeFeed } from "@/lib/api";

export default async function HomePage() {
  const [feed, categories] = await Promise.all([getHomeFeed(), getCategories()]);
  return <FlipkartHome feed={feed} categories={categories} />;
}
