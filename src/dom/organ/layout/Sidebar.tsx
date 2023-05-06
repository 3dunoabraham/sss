import Image from 'next/image'


import LoginFormMinimal from '../../cell/form/LoginFormMinimal';
import LogoutForm from '../../cell/form/LogoutForm';

function Wrapper({children}:any) {
  return (
    <div className='h-100vh noverflow'>
      <div className='w-300px h-100vh noverflow flex-col Q_lg_x'> {children} </div>
      <div className='w-min-100px h-100vh noverflow flex-col Q_xs_lg'> {children} </div>
    </div>
  )
}

function Component ({ foundUser, children }:{ foundUser:any, children?:any }) {
  
  return (<>
    <Wrapper>
      <a href="/" className='py-4 flex-center '>
        <div className='bg-w-10 px-1 py-1 bord-r-10 scale-90'>
          <div className='tx-bold tx-lgx'>IMS</div>
          {/* <Image src='/icons/logo.svg' alt='next' width='28' height='28'/> */}
        </div>
        <div className='Q_lg_x pl-1'>
          <div className='tx-bold-3 tx-lg'>Front</div>
          {/* <Image src='/icons/Vector.png' alt='next' width='129' height='19'/> */}
        </div>
      </a>
      <div className='flex-1 w-100  autoverflow '
          style={{width:"107%"}}
        > {children} </div>
      <div className='pb-4'>
        {!foundUser && <LoginFormMinimal />}
        
        {foundUser && <div className='pb-4 '>
          <div className='flex-col tx-l Q_lg_x opaci-10 py-2'>{foundUser.email}</div>
          <LogoutForm />
        </div>}
      </div>
    </Wrapper>
  </>);
};

export default Component;
