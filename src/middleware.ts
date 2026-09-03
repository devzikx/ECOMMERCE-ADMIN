import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // '/admin' 경로 및 하위 경로 보호
  if (pathname.startsWith('/admin')) {
    // 기본 인증 체크 (현재는 Mock을 사용하므로 세션이 없음)
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

    // Mock 사용 중: 로그인 페이지로 리다이렉트하지 않음
    // 실제 구현 시 위의 주석 처리된 코드를 활성화
  }

  // '/login' 페이지에 접근할 때 이미 인증된 사용자는 대시보드로 리다이렉트
  if (pathname === '/login') {
    // Mock 사용 중: 리다이렉트하지 않음
    // 실제 구현 시 세션 확인 후 리다이렉트
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
