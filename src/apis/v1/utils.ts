import * as path from 'path';
import { unescape } from 'querystring';

export function fromQueryParam<T = any>(param: string): T {
  return JSON.parse(unescape(param));
}

export function getParamNameFromScriptName(fileName: string) {
  const name = path.basename(path.resolve(fileName), path.extname(fileName));
  return pathSegmentToParamName(name);
}

function pathSegmentToParamName(segment: string, checked = false) {
  if (!checked && !isParamPathSegment(segment)) {
    throw new TypeError(
      `"${segment}" must be in curve parenthesis {} to be a valid parameter name`
    );
  }
  return segment.slice(1, -1);
}

function isParamPathSegment(segment: string) {
  return segment[0] === '{' || segment[segment.length - 1] === '}';
}
