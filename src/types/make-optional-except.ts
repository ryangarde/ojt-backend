type MakeOptionalExcept<Type, Key extends keyof Type> = Partial<Omit<Type, Key>> & Pick<Type, Key>;

export default MakeOptionalExcept;
