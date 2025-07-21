import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { fetchThemeDetail } from '@/api/theme';
import type { Theme } from '@/types/theme';
import { ROUTE } from '@/constants/routes';
import axios from 'axios';
import { HttpStatusCode } from 'axios';
import { toast } from 'react-toastify';

const Hero = styled.section<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  padding: ${({ theme }) => theme.spacing.spacing6};
  color: ${({ theme }) => theme.colors.gray.gray00};
`;

const Title = styled.h1`
  ${({ theme }) => theme.typography.title1Bold};
  margin-top: ${({ theme }) => theme.spacing.spacing2};
`;

const Description = styled.p`
  ${({ theme }) => theme.typography.body2Regular};
`;

const ThemeName = styled.h2`
  ${({ theme }) => theme.typography.body2Bold};
`;

const ThemeProductsPage = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        if (!themeId) {
          return;
        }
        const data = await fetchThemeDetail(Number(themeId));
        setTheme(data);
      } catch (error) {
        if (error instanceof axios.AxiosError) {
          const status = error.response?.status;
          const msg = error.response?.data?.data?.message || '테마 정보를 불러오지 못했습니다.';

          if (status === HttpStatusCode.NotFound) {
            navigate(ROUTE.MAIN);
          } else {
            toast.error(msg);
          }
        } else {
          toast.error('오류가 발생했습니다.');
        }
      }
    };

    loadTheme();
  }, [themeId, navigate]);

  if (!theme) {
    return null;
  }

  return (
    <>
      <Hero bgColor={theme.backgroundColor}>
        <ThemeName>{theme.name}</ThemeName>
        <Title>{theme.title}</Title>
        <Description>{theme.description}</Description>
      </Hero>
    </>
  );
};

export default ThemeProductsPage;
