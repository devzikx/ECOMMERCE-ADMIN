import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get('admin_token')?.value;

  // '/admin' 경로 및 하위 경로 보호
  if (pathname.startsWith('/admin')) {
    if (!authToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // 실제 Supabase 연동 시에는 아래와 같이 구현:
    /*
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => request.cookies.getSetCookie(),
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!userData || userData.role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    */
  }

  // '/login' 페이지에 접근할 때 이미 인증된 사용자는 대시보드로 리다이렉트
  if (pathname === '/login' && authToken) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
