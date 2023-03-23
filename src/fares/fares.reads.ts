export const fareByDayRead: string = `
    SELECT 
        fares.rid,
        clients.identity AS clientIdentity,
        drivers.identity AS driverIdentity,
        clients.phone,
        fares.created_at,
        fares.creator,
        fares.date,
        fares.distance,
        fares.duration,
        fares.isreturn,
        fares.locked,
        fares.meters,
        fares.recurrent,
        fares.status,
        fares.subcontractor,
        fares."time",
        fares."timestamp",
        fares.updated_at,
        fares.weeklyrecurrence,
        fares.drive_rid,
        drives.type AS driveNature,
        drives.drive_from,
        drives.drive_to,
        drives.comment AS driveComment,
        drives.distanceoverride,
        drives.name,
        clients.comment AS clientComment
    FROM (public.fares fares
     LEFT JOIN public.drives drives ON ((fares.drive_rid = drives.rid))
     LEFT JOIN public.users clients ON ((drives.client_rid = clients.rid))
     LEFT JOIN public.drivers drivers ON ((fares.driver_rid = drivers.rid))
     )
    WHERE (fares.date =$1);
    `;

export type FarePg = {
    rid: string;
    clientidentity: string;
    driveridentity: string | null;
    phone: string;
    created_at: string;
    creator: string;
    date: string;
    distance: string;
    duration: string;
    isreturn: string;
    locked: string;
    meters: string;
    recurrent: string;
    status: string;
    subcontractor: string;
    time: string;
    timestamp: string;
    updated_at: string;
    weeklyrecurrence: string;
    drive_rid: string;
    drivetype: string;
    drive_from: string;
    drive_to: string;
    drivecomment: string | null;
    distanceoverride: string | null;
    name: string;
    clientcomment: string | null;
}



export type FareTransfer = {
    clientComment: string | undefined;
    clientIdentity: string;
    clientPhone: string;
    createdAt: string;
    creatorIdentity: string;
    date: string;
    driveDistanceInMeters: string;
    driveComment: string | undefined;
    driveDistanceOverride: string | undefined;
    driveFrom: string;
    driveKind: 'one-way' | 'outward' | 'return';
    driveName: string;
    driveNature: 'medical' | 'normal';
    driveRid: string;
    driverIdentity: string | undefined;
    driveTo: string;
    duration: string;
    rid: string;
    startTime: string;
    status: string;
    subcontractorIdentity: string | undefined;
    updatedAt: string;
    weeklyRecurrence: string;
};

export const toFaresTransfer = (fare: FarePg): FareTransfer => {
    return {
        clientComment: fare.drivecomment ?? undefined,
        clientIdentity: fare.clientidentity,
        clientPhone: fare.phone,
        createdAt:  fare.created_at,
        creatorIdentity: fare.creator,
        date: fare.date,
        driveComment: fare.drivecomment ?? undefined,
        driveDistanceInMeters: fare.meters,
        driveDistanceOverride: fare.distanceoverride ?? undefined,
        driveFrom: fare.drive_from,
        driveKind: 'outward',
        driveName: fare.name,
        driveNature: "medical",
        driveRid: fare.drive_rid,
        driveTo: fare.drive_to,
        driverIdentity: fare.driveridentity ?? undefined,
        duration: fare.duration,
        rid: fare.rid,
        startTime: fare.time,
        status: fare.status,
        subcontractorIdentity: fare.subcontractor ?? undefined,
        updatedAt: fare.updated_at,
        weeklyRecurrence: fare.weeklyrecurrence
    };
}