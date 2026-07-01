import { createFileRoute } from "@tanstack/react-router";
import { SiteOS } from "../components/os/SiteOS";

export const Route = createFileRoute("/")({
  component: SiteOS,
});
