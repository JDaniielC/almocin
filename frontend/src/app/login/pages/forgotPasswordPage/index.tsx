import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockResetIcon from '@mui/icons-material/LockReset';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ForgotPasswordType } from '../../forms/ForgotPasswordForm';
import { UserContext } from '../../../admin/context/userContext';
import { useNavigate } from 'react-router-dom';

export default function EsqueceuSenhaPage() {
  const { state, service } = useContext(UserContext);
  const [formData, setFormData] = useState<ForgotPasswordType>({
    email: '',
    petName: '',
    newPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    service.forgotPassword(formData);
    alert('Senha redefinida com sucesso!');
    setError(null)
  }, [formData, service]);

  useEffect(() => {
    state.resetPasswordRequestStatus.maybeMap({
      failed: ({ message }) => {
        setError(message);
      },
      succeeded: () => {
        setError(null);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    })
  })

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockResetIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Esquecer Senha
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            error={!!error}
            helperText={error}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="petName"
            label="Nome do Primeiro Pet"
            autoComplete="off"
            value={formData.petName}
            onChange={handleChange}
            error={!!error}
            helperText={error}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="Nova Senha"
            type="password"
            autoComplete="new-password"
            value={formData.newPassword}
            onChange={handleChange}
            error={!!error}
            helperText={error}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Redefinir Senha
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/login" variant="body2">
                Lembrei a senha? Voltar para o login
              </Link>
            </Grid>
            <Grid item>
              <Link href="/cadastro" variant="body2">
                {"Não tem uma conta? Cadastre-se"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
