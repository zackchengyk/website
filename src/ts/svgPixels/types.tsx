export type XY = { x: number; y: number }

export function xyEqual(left: XY, right: XY): boolean {
  return left.x === right.x && left.y === right.y
}
