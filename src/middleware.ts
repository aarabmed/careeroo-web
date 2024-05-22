import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest, res:NextResponse) {

  const headers = new Headers(req.headers);
  
  let segment1 = ['/api/me','/api/contact','/api/articles/search','/api/articles','/api/categories','/api/sub-category','/api/city','/api/provinces']
  let segment0 = ['me','contact','articles','categories','sub-category','city','provinces']

  let segment2 = ['provinces','search']  
  let segment3 = ['/api/provinces/province']

  const path = req.nextUrl.pathname
  const routes = path.split('/')

  console.log('path::',path)
  if(path === '/api'){
    return NextResponse.next();
  }

  if(routes.length>4){
    return NextResponse.json({success:false, message:'route does not exist'},{status:404})
  }
  

  
  if(routes.length===4){ 
    if(routes[1]==='api'&&(!segment1.includes(path.toString())&&(routes[2]!=='provinces'&&routes[3]!=='search'))){
      return NextResponse.json({success:false, message:'route does not exist'},{status:404})
    }
  }


  if(routes.length===3){ 
    if(routes[1]==='api'&&(!segment1.includes(path.toString())&&(routes[2]!=='provinces'))){
      return NextResponse.json({success:false, message:'route does not exist'},{status:404})
    }
  }

    // true && (true && true)
  headers.set('role', 'guest');
  console.log('res:',res)

  return NextResponse.next({
    request: {
      headers
    }
  });
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)',]
};