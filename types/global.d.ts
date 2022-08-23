declare module '*.json' {
  const content: any
  export default content
}

declare module '*.yml' {
  const content: {readonly [key: string]: any}
  export default content
}

declare module '*.svg' {
  import {FC, SVGProps} from 'react'

  const ReactComponent: FC<SVGProps<SVGSVGElement>>
  export {ReactComponent}

  const content: string
  export default content
}
