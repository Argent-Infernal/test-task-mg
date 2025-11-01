//Мок функционала авторизации
interface AuthenticatedRequest extends Express.Request {
  user?: {
    id: number;
  };
}
export default AuthenticatedRequest;
