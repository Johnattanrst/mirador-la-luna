/**
 * Shared component contracts.
 *
 * Every component follows the same signature: a pure `render(props): string`
 * function plus an optional `mount(el, props)` for event listeners attached
 * after the markup is inserted into the DOM. This mirrors a React component's
 * (props) => JSX shape, so migrating later is a mechanical conversion rather
 * than a rewrite.
 */

export interface Mountable<Props> {
  render: (props: Props) => string
  mount?: (element: HTMLElement, props: Props) => void
}
