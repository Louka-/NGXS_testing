export class IncrementAbilityOperation {
  static readonly type = '[Operations] Increment ability';
  constructor(public abilityIndex: string) {}
}

export class DecrementAbilityOperation {
  static readonly type = '[Operations] Decrement ability';
  constructor(public abilityIndex: string) {}
}

export class ResetAbilityPointsOperation {
  static readonly type = '[Operations] Reset points';
}

