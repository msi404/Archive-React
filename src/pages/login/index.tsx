import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from '@/shared/lib/features/authSlice';
import { TatweerLogo } from '@/shared/components';
import { LoginForm } from '@/pages/login/components';
import TatweerFooterLogo from '@/assets/tatweer.png'; // Assuming the small footer logo is the same
import { Image } from '@unpic/react';

export default function LoginPage ()
{
	const navigate = useNavigate();
	const token = useSelector( selectToken );

	useEffect( () =>
	{
		if ( token )
		{
			navigate( '/dashboard', { replace: true } );
		}
	}, [ token, navigate ] );

	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col items-center justify-center p-6 md:p-10 relative">
				<div className="w-full max-w-sm space-y-6">
					<div className="text-center">
						<h1 className="text-3xl font-bold mb-2">تسجيل الدخول</h1>
						<p className="text-muted-foreground">
							يرجى ادخال اسم المستخدم وكلمة المرور لتسجيل الدخول
						</p>
					</div>
					<LoginForm />
				</div>
				<div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-2 text-sm text-muted-foreground">
					<Image
						src={ TatweerFooterLogo }
						alt="Tatweer Logo"
						width={ 80 }
						height={ 15 }
					/>
					<span>Powered By</span>
				</div>
			</div>
			<div className="relative hidden bg-muted lg:flex items-center justify-center p-10">
				<TatweerLogo className="w-1/2" />
			</div>
		</div>
	);
}
