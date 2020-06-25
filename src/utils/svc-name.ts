import { basename } from "path";
import appRoot from "app-root-path";

/**
 * Get service name from directory structure
 */
export const svcName = () => `${basename(appRoot.path).replace("-", "/")}`;
