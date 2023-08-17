/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PerfumeRepository } from "../../core/services/perfume.repository";
import { AppDispatch, RootState } from "../../core/store/store";
import {
  createPerfumeAsync,
  deletePerfumeByIdAsync,
  editPerfumeAsync,
  loadFilteredPerfumesAsync,
  loadPerfumesAsync,
} from "../redux/thunks";
import { Perfume } from "../models/perfume";
// import { ac } from "../redux/users.slice";

export function usePerfumes() {
  const selectPerfumes = (state: RootState) => state.perfumes;
  const { perfumes } = useSelector(selectPerfumes);
  const { token } = useSelector((state: RootState) => state.users);
  const dispatch: AppDispatch = useDispatch();
  const url = "http://localhost:4242/";
  const perfumeRepo: PerfumeRepository = useMemo(
    () => new PerfumeRepository(url, token as string),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const handleLoadPerfumes = useCallback(async () => {
    dispatch(loadPerfumesAsync(perfumeRepo));
  }, [dispatch, perfumeRepo]);

  const handleAddPerfumes = useCallback(
    async (perfume: Perfume) => {
      dispatch(createPerfumeAsync({ perfume, repo: perfumeRepo }));
    },
    [dispatch, perfumeRepo]
  );

  const handleDelete = (id: string) => {
    dispatch(deletePerfumeByIdAsync({ id, repo: perfumeRepo }));
  };

  const handleEditPerfume = async (data: Partial<Perfume>) => {
    dispatch(editPerfumeAsync({ repo: perfumeRepo, data }));
  };

  const handleFilterPerfumes = async (filter: string) => {
    dispatch(loadFilteredPerfumesAsync({ repo: perfumeRepo, filter }));
  };

  return {
    handleFilterPerfumes,
    handleEditPerfume,
    handleDelete,
    handleLoadPerfumes,
    handleAddPerfumes,
    perfumes,
    perfumeRepo,
    url,
  };
}
