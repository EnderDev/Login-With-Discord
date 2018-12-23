/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

interface IConnection {
    friend_sync: boolean;
    id: string;
    name: string;
    show_activity: boolean;
    type: string; // ENUM?
    verified: boolean;
    visibility: number;
}