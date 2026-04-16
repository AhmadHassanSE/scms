import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import navyLogo from '../../pakistan-navy-logo-png_seeklogo-366309.png';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const user = login(username, password);
      if (user) {
        onLogin();
      } else {
        setError('Invalid username or password');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-sky-50 to-white p-4 relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-white/95 mb-4 shadow-xl shadow-blue-900/30 border border-blue-200/80 p-2.5">
            <img src={navyLogo} alt="Pakistan Navy logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-blue-950 tracking-wide">Special Children Management System</h1>
          <p className="text-blue-700/85 mt-1">Government of Pakistan - Welfare Division</p>
        </div>

        <Card className="shadow-2xl shadow-blue-900/20 border-blue-200/70 backdrop-blur-sm bg-white/90">
          <CardHeader>
            <CardTitle className="text-xl text-blue-950">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="username"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-sky-50 rounded-lg text-sm border border-blue-200/70">
              <p className="font-medium text-blue-900 mb-2">Demo Credentials:</p>
              <div className="space-y-1 text-blue-800">
                <p><span className="font-mono bg-white border border-blue-200 px-1 rounded">admin</span> / <span className="font-mono bg-white border border-blue-200 px-1 rounded">admin123</span> - Full Access</p>
                <p><span className="font-mono bg-white border border-blue-200 px-1 rounded">finance</span> / <span className="font-mono bg-white border border-blue-200 px-1 rounded">finance123</span> - Finance Officer</p>
                <p><span className="font-mono bg-white border border-blue-200 px-1 rounded">operator</span> / <span className="font-mono bg-white border border-blue-200 px-1 rounded">operator123</span> - Data Entry</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-blue-800/75 mt-6">
          © 2024 Special Children Management System. All rights reserved.
        </p>
      </div>
    </div>
  );
}
