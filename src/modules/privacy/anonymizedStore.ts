/**
 * 「365 消化池」取向的儲存形狀：僅假名主體 ID + 行為特徵，不含可還原 PII。
 * 不強制隱去 coarse source（審計／除錯常需要）；若政策要求不註明來源，於寫入前將 sourceBucket 設為 'undisclosed'。
 */
export type BehaviorFeatureKind = 'action' | 'duration_ms' | 'category' | 'count' | 'custom';

export interface BehaviorFeature {
  kind: BehaviorFeatureKind;
  key: string;
  /** 僅限聚合或類別值，勿放原始 PII */
  value: string | number | boolean;
}

export interface AnonymizedEventRecord {
  subjectPseudonym: string;
  recordedAt: string;
  /** 粗分區，可設為 undisclosed 以符合「不註明來源細節」 */
  sourceBucket: string;
  features: BehaviorFeature[];
}
