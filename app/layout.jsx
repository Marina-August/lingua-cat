import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import Provider from '@/components/Provider';
import '@/styles/globals.css'


export const metadata = {
  title: 'Lingua Cat',
  description: 'Learn Foreign Languages easily',
}

const RootLayout =({ children })=>{
  return (
    <html lang="en">
      <body >
        <div className='main'>
          <div className='gradient'/>
        </div>
        <main className='app'>
            {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout;
