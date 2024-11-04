import loadable from "@loadable/component"; // loadable ni to'g'ri import qilish
import { Loading } from '../component';

const SignIn = loadable(() => import('./auth/pages/sign_up'), {
  fallback: <Loading />,  
});
const SignUp = loadable(() => import('./auth/pages/sign_in'), {
    fallback: <Loading />,  
  });
  const Layout = loadable(() => import('./layout'), {
    fallback: <Loading />,  
  });
  const Product = loadable(() => import('./product/pages'), {
    fallback: <Loading />,  
  });
  const Contract = loadable(() => import('./contract/pages'), {
    fallback: <Loading />,  
  });
  const Exchange = loadable(() => import('./exshange/pages'), {
    fallback: <Loading />,  
  });
  const Transaction = loadable(() => import('./transaction/pages'), {
    fallback: <Loading />,  
  });
export {SignIn,SignUp,Layout,Product,Contract, Exchange,Transaction};
