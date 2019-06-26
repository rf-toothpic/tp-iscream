/**
 *
 * Asynchronously loads the component for Entry
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
