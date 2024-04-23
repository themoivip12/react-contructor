import { TYPE_OF_EPISODE, TYPE_OF_NOTICE } from 'types';

export const EpisodeStatusList = [
  { label: '발행전', value: TYPE_OF_EPISODE.BEFORE_ISSUANCE },
  { label: '발행완료', value: TYPE_OF_EPISODE.ISSUANCE },
  { label: '발행취소', value: TYPE_OF_EPISODE.CANCEL },
  { label: '발행전', value: TYPE_OF_NOTICE.BEFORE_ISSUANCE },
  { label: '발행완료', value: TYPE_OF_NOTICE.ISSUANCE },
  { label: '발행취소', value: TYPE_OF_NOTICE.CANCEL },
];
