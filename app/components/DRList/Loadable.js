/**
 *
 * Asynchronously loads the component for DRList
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
