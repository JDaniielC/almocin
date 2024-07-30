import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { LoginFormSchema, LoginFormType } from '../../forms/LoginForm';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../admin/context/userContext';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from '../../../../shared/components/Loading';
import Modal from '../../../../shared/components/Modal';

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
  });
  const { service, state } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => {
    return () => setOpen(false);
  }

  const onSubmit: SubmitHandler<LoginFormType> = (data) => {
    const { email } = data;
    if (email == 'admin') {
      navigate('/adm');
    }
    service.login(data)
  };

  useEffect(() => {
    state.loginRequestStatus.maybeMap({
      succeeded: () => {
        navigate('/');
      },
      failed: () => {
        setOpen(true);
      }
    })
  }, [state, navigate]);

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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Entrar na conta
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            autoComplete="email"
            data-cy="login"
            autoFocus
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            type="password"
            id="password"
            data-cy="password"
            autoComplete="current-password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            data-cy="submit-login"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="forgot-password" variant="body2">
                Esqueceu a senha?
              </Link>
            </Grid>
            <Grid item>
              <Link href="cadastro" variant="body2">
                {"Não tem uma conta? Cadastre-se"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {
        state.loginRequestStatus.maybeMap({
          loading: () => <LoadingComponent></LoadingComponent>,
          failed: () => (
            <Modal open={open} closeButtonCallback={closeModal()}>
              <Typography variant="h6" component="div">
                Email ou senha inválidos!
              </Typography>
            </Modal>
          )
        })
      }
    </Container>
  );
}
