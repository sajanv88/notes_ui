export type CreatedBy = {
    userId: string;
    fullName: string;

}
export type Note = {
    _id: string;
    description: string;
    createdBy: CreatedBy;
    createdAt: string;
};

export type NotesResponse = {
    totalNotes: number;
    list: Note[];
    matchedRecordsCount?: number;
    searchQuery?: string;
}

export type CreateNote = {
    description: string;
    createdBy: CreatedBy
}

export type UpdateNote = {
    description: string;
    userId: string;

}


export type ErrorType = Record<string, any>;

export type User = {
    emailAddress: string;
    _id: string;
    firstName: string;
    lastName: string;
    exp: number;
    userStatus: string;
}


