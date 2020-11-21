import { createInnerPrefix, createInnerSuffix } from './suffixFactories';

/**
 *
 *
 * @param {number} start
 * @param {number} end
 * @param {function} pageFactory
 */
const createSimpleRange = (start, end, pageFactory) => Array.from({ length: end + 1 - start }, (_, i) => start + i).map(pageFactory);

export const createComplexRange = ({ activePage, boundaryRange, hideEllipsis, siblingRange, totalPages }, pageFactory) => {

  const ellipsisSize = hideEllipsis ? 0 : 1;
  const firstGroupEnd = boundaryRange;
  const firstGroup = createSimpleRange(1, firstGroupEnd, pageFactory);

  const lastGroupStart = totalPages + 1 - boundaryRange;
  const lastGroup = createSimpleRange(lastGroupStart, totalPages, pageFactory);

  const innerGroupStart = Math.min(
    Math.max(activePage - siblingRange, firstGroupEnd + ellipsisSize + 1),
    lastGroupStart - ellipsisSize - 2 * siblingRange - 1,
  );
  const innerGroupEnd = innerGroupStart + 2 * siblingRange;
  const innerGroup = createSimpleRange(innerGroupStart, innerGroupEnd, pageFactory);

  return [
    ...firstGroup,
    !hideEllipsis && createInnerPrefix(firstGroupEnd, innerGroupStart, pageFactory),
    ...innerGroup,
    !hideEllipsis && createInnerSuffix(innerGroupEnd, lastGroupStart, pageFactory),
    ...lastGroup,
  ].filter(Boolean);
};
