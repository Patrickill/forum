import { BiLike, BiSolidDislike, BiSolidLike, BiDislike } from 'react-icons/bi';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegStar, FaStar, FaRegCommentDots, FaRegClock, FaTrashAlt } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { CiLogout } from 'react-icons/ci';

export const IconLib = {
  like: BiLike,
  likeFill: BiSolidLike,
  dislike: BiDislike,
  dislikeFill: BiSolidDislike,
  view: MdOutlineRemoveRedEye,
  star: FaRegStar,
  starFill: FaStar,
  comment: FaRegCommentDots,
  send: IoSend,
  clock: FaRegClock,
  trash: FaTrashAlt,
  out: CiLogout,
};
