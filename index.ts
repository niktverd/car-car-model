import {omit} from 'lodash'
import { getReport } from "./src/report";

console.log(omit(getReport(), 'world'));
