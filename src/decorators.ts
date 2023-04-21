export function Controller(router: string) {
  return function (target: any) {
    console.log(router, target)
  }
}
