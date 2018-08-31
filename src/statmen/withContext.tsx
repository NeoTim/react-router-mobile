// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

// export function withAppContext<
//   P extends { appContext?: AppContextInterface },
//   R = Omit<P, 'appContext'>
// >(
//   Component: React.ComponentClass<P> | React.StatelessComponent<P>,
// ): React.SFC<R> {
//   return function BoundComponent(props: R) {
//     return (
//       <AppContextConsumer>
//         {value => <Component {...props} appContext={value} />}
//       </AppContextConsumer>
//     )
//   }
// }
