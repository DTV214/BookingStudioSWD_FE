/**
 * TokenDebugger Component - Hiển thị thông tin JWT token để debug
 * 
 * Component này hiển thị:
 * - Trạng thái token
 * - Thông tin user từ token
 * - Thời gian hết hạn
 * - Nút refresh token
 * - Logs debug
 */

import React, { useState } from 'react';
import { useAuthToken } from '@/infrastructure/api/service/useAuthToken';
import { JWTUtil } from '@/infrastructure/utils/jwt';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  RefreshCw, 
  Clock, 
  User, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  XCircle,
  Eye,
  EyeOff
} from 'lucide-react';

interface TokenDebuggerProps {
  showDetails?: boolean;
  className?: string;
}

export const TokenDebugger: React.FC<TokenDebuggerProps> = ({ 
  showDetails = false, 
  className = '' 
}) => {
  const {
    token,
    isTokenValid,
    isTokenExpiringSoon,
    isRefreshing,
    user,
    isAuthenticated,
    refreshToken,
    authenticateToken,
    getCurrentToken
  } = useAuthToken();

  const [showToken, setShowToken] = useState(false);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setDebugLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 9)]);
  };

  const handleRefreshToken = async () => {
    addLog('Attempting to refresh token...');
    try {
      const newToken = await refreshToken();
      if (newToken) {
        addLog('Token refreshed successfully');
      } else {
        addLog('Token refresh failed');
      }
    } catch (error) {
      addLog(`Token refresh error: ${error}`);
    }
  };

  const handleAuthenticateToken = () => {
    addLog('Authenticating token...');
    const result = authenticateToken();
    if (result.isValid) {
      addLog(`Token is valid for user: ${result.user?.email}`);
    } else {
      addLog(`Token authentication failed: ${result.error}`);
    }
  };

  const formatToken = (token: string) => {
    if (!showToken) {
      return token.substring(0, 20) + '...';
    }
    return token;
  };

  const getTokenStatus = () => {
    if (!token) return { status: 'No Token', color: 'bg-gray-500', icon: XCircle };
    if (!isTokenValid) return { status: 'Invalid', color: 'bg-red-500', icon: XCircle };
    if (isTokenExpiringSoon) return { status: 'Expiring Soon', color: 'bg-yellow-500', icon: AlertTriangle };
    return { status: 'Valid', color: 'bg-green-500', icon: CheckCircle };
  };

  const tokenStatus = getTokenStatus();
  const StatusIcon = tokenStatus.icon;

  if (!showDetails && !isAuthenticated) {
    return null;
  }

  return (
    <Card className={`w-full max-w-2xl ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          JWT Token Debugger
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Token Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StatusIcon className="w-4 h-4" />
            <span className="font-medium">Token Status:</span>
            <Badge className={tokenStatus.color}>
              {tokenStatus.status}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleRefreshToken}
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={handleAuthenticateToken}
            >
              <Shield className="w-4 h-4 mr-1" />
              Verify
            </Button>
          </div>
        </div>

        {/* Token Details */}
        {token && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">Token:</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowToken(!showToken)}
              >
                {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
            <div className="bg-gray-100 p-2 rounded text-xs font-mono break-all">
              {formatToken(token)}
            </div>
          </div>
        )}

        {/* User Info */}
        {user && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="font-medium">User Info:</span>
            </div>
            <div className="bg-gray-50 p-3 rounded text-sm">
              <div><strong>ID:</strong> {user.id || 'N/A'}</div>
              <div><strong>Email:</strong> {user.email}</div>
              {user.role && <div><strong>Role:</strong> {user.role}</div>}
              {user.userType && <div><strong>Type:</strong> {user.userType}</div>}
              {user.status && <div><strong>Status:</strong> {user.status}</div>}
            </div>
          </div>
        )}

        {/* Token Expiration */}
        {token && isTokenValid && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="font-medium">Expiration:</span>
            </div>
            <div className="bg-gray-50 p-3 rounded text-sm">
              {(() => {
                const decoded = JWTUtil.decodeToken(token);
                if (decoded?.exp) {
                  const expDate = new Date(decoded.exp * 1000);
                  const now = new Date();
                  const timeLeft = expDate.getTime() - now.getTime();
                  const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
                  const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                  
                  return (
                    <div>
                      <div><strong>Expires:</strong> {expDate.toLocaleString()}</div>
                      <div><strong>Time Left:</strong> {hoursLeft}h {minutesLeft}m</div>
                      {isTokenExpiringSoon && (
                        <div className="text-yellow-600 font-medium">
                          ⚠️ Token expires soon!
                        </div>
                      )}
                    </div>
                  );
                }
                return <div>Unable to parse expiration</div>;
              })()}
            </div>
          </div>
        )}

        {/* Debug Logs */}
        {debugLogs.length > 0 && (
          <div className="space-y-2">
            <div className="font-medium">Debug Logs:</div>
            <div className="bg-black text-green-400 p-3 rounded text-xs font-mono max-h-32 overflow-y-auto">
              {debugLogs.map((log, index) => (
                <div key={index}>{log}</div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex gap-2 pt-2 border-t">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              const currentToken = getCurrentToken();
              if (currentToken) {
                navigator.clipboard.writeText(currentToken);
                addLog('Token copied to clipboard');
              }
            }}
          >
            Copy Token
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              const result = authenticateToken();
              console.log('Token authentication result:', result);
              addLog('Token details logged to console');
            }}
          >
            Log Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenDebugger;
