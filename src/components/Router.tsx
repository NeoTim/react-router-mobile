import * as React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { getPath } from '../util'
import { connect } from '../statmen'
import PageStore from '../stores/PageStore'
import navigate from '../navigate'

// event
function bindEvent() {
  if (typeof addEventListener !== 'function') return
  addEventListener('popstate', () => navigate(getPath()))
}

bindEvent()

interface Prop {
  [propName: string]: any
}

class Router extends React.Component<Prop> {
  componentDidMount = () => {
    const { routes } = this.props
    const { pageStore } = this.props
    pageStore.init(routes)
    pageStore.go(getPath())
  }

  render() {
    const { pageStore } = this.props
    const { mountedPages } = pageStore.state
    console.log('mountedPages:', mountedPages)

    return (
      <TransitionGroup class="pages">
        {mountedPages.map((page, index) => {
          const Page = page.component
          if (!page.routes || !page.routes.length) {
            return (
              <CSSTransition
                key={index}
                timeout={400}
                classNames={page.animation}
              >
                <div className="page">
                  <Page />
                </div>
              </CSSTransition>
            )
          }

          return (
            <CSSTransition
              key={index}
              timeout={400}
              classNames={page.animation}
            >
              <div className="page">
                <Page>
                  <TransitionGroup class="sub-pages">
                    {page.routes.map((subPage, key) => {
                      const SubPage = subPage.component
                      return (
                        <CSSTransition
                          key={key}
                          timeout={400}
                          classNames={subPage.animation}
                        >
                          <div
                            style={{ zIndex: 1 }}
                            className={`sub-page ${subPage.className}`}
                          >
                            <SubPage />
                          </div>
                        </CSSTransition>
                      )
                    })}
                  </TransitionGroup>
                </Page>
              </div>
            </CSSTransition>
          )
        })}
      </TransitionGroup>
    )
  }
}

export default connect([PageStore])(Router)
