import * as React from 'react'

import { inject } from 'stamen'
import pageModel, { PageStore } from '../stores/PageStore'

interface InjectProps {
  pageStore: PageStore
}

interface Props extends InjectProps {
  [propName: string]: any
}
@inject(pageModel)
class Back extends React.Component<Props> {
  back = () => {
    const { pageStore } = this.props
    pageStore.back()
  }

  render() {
    return <div onClick={this.back}>返回</div>
  }
}

export default Back
