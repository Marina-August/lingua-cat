import Provider from '@/components/Provider';
import ReduxProvider from '@/redux/provider';
import '@/styles/globals.css'


export const metadata = {
  title: 'Lingua Cat',
  description: 'Learn Foreign Languages easily',
  httpEquiv: 'Permissions-Policy',
  content: 'interest-cohort=()'

}

const RootLayout =({ children })=>{
  return (
    <html lang="en">
      <body >
        <Provider>
          <ReduxProvider>
            <div className='main'>
              <div className='gradient'/>
            </div>
            <main className='app'>
              {children}
            </main>
          </ReduxProvider>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout;
