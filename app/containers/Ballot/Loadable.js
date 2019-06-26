/**
 *
 * Asynchronously loads the component for Ballot
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));
