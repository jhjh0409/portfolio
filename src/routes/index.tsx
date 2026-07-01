import { createFileRoute } from "@tanstack/react-router";
import { JingHuanOS } from "../components/os/JingHuanOS";

export const Route = createFileRoute("/")({
  component: JingHuanOS,
});
