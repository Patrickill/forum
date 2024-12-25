import { createPostType } from '@/types/core/post';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type DraftType = createPostType & { id: string; time: Date };

type State = {
  draftList: DraftType[];
  addDraft: (post: DraftType) => void;
  removeDraft: (id: string) => void;
  clearDraft: () => void;
  updateDraft: (post: DraftType) => void;
};

export const usePostStore = create<State>()(
  devtools(
    persist(
      immer((set, get) => ({
        draftList: [],
        addDraft: (post: DraftType) => {
          set((state) => {
            state.draftList.push(post);
          });
        },
        removeDraft: (id: string) =>
          set((state) => {
            state.draftList = state.draftList.filter((item) => item.id !== id);
          }),
        clearDraft: () =>
          set((state) => {
            state.draftList = [];
          }),
        updateDraft: (post: DraftType) =>
          set((state) => {
            const index = state.draftList.findIndex((item) => item.id === post.id);
            if (index !== -1) {
              state.draftList[index] = post;
            }
          }),
      })),
      {
        name: 'draft-list',
      }
    )
  )
);
