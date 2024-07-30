import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../admin/context/userContext/index';
import { Box, Grid, TextField, Button, Link, Avatar, Typography, Container, CssBaseline, Select } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormSchema, RegisterFormType } from '../../forms/RegisterForm'
import { useNavigate } from 'react-router-dom';
import LoadingComponent from '../../../../shared/components/Loading';
import Modal from '../../../../shared/components/Modal';

const RegisterPage = () => {
  const { service, state }  = useContext(UserContext);
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterFormSchema),
  });
  const navigate = useNavigate();
  const onSubmit = useCallback((data: RegisterFormType) => {
    const payload: RegisterFormType = {
      name: data.name,
      email: data.email,
      password: data.password,
      cep: data.cep,
      recoveryQuestion: data.recoveryQuestion,
      paymentMethod: 'credit_card',
      gender: 'male',
      cpf: data.cpf.replaceAll('.', '').replace('-', '')
    } as RegisterFormType;
    service.createUser(payload);
  }, [service]);
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    return () => setOpen(false);
  }

  useEffect(() => {
    state.createUserRequestStatus.maybeMap({
      succeeded: () => {
        console.log('Usuário criado com sucesso');
        navigate('/login');
      },
      failed: (error) => {
        console.log(error);
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
          Cadastro
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                id="name"
                label="Nome completo"
                autoFocus
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                autoComplete="email"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Senha"
                type="password"
                id="password"
                autoComplete="new-password"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="CEP"
                id="cep"
                autoComplete="postal-code"
                {...register('cep')}
                error={!!errors.cep}
                helperText={errors.cep?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Nome do primeiro animal de estimação"
                id="recoveryQuestion"
                {...register('recoveryQuestion')}
                error={!!errors.recoveryQuestion}
                helperText={errors.recoveryQuestion?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                native
                fullWidth
                id="paymentMethod"
                {...register('paymentMethod')}
                error={!!errors.paymentMethod}
              >
                <option value="" disabled>Forma de pagamento</option>
                <option value="credit_card">Cartão de crédito</option>
                <option value="boleto">Boleto</option>  
              </Select> 
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="CPF"
                id="cpf"
                autoComplete="cpf"
                {...register('cpf')}
                error={!!errors.cpf}
                helperText={errors.cpf?.message}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cadastrar
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="login" variant="body2">
                Já tem uma conta? Faça login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {
        state.createUserRequestStatus.maybeMap({
          loading: () => <LoadingComponent></LoadingComponent>,
          failed: () => (
            <Modal open={open} closeButtonCallback={closeModal()}>
              <Typography variant="h6" component="div">
                Ocorreu um erro, tente novamente
              </Typography>
            </Modal>
          )
        })
      }
    </Container>
  );
};

export default RegisterPage;
