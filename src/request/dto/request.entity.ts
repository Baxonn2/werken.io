import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export const availableRequestMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
export type RequestMethod = typeof availableRequestMethods[number];

@Entity()
export class RequestResponse {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    receivedAt: Date;

    @Column()
    code: number;

    @Column({ type: 'json', nullable: true})
    body?: Record<string, any>;
}

@Entity()
export class RequestHook {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column({ type: 'json', nullable: true})
    headers?: Record<string, string>;
    
    @Column({ type: 'json', nullable: true})
    body?: Record<string, any>;

    @Column({ type: 'enum', enum: availableRequestMethods})
    method: RequestMethod;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    sendAt?: Date;

    @Column({ type: 'boolean', default: false })
    isSended: boolean = false;

    @Column({ type: 'timestamp', nullable: true })
    sendedAt: Date;

    @OneToOne(() => RequestResponse, { nullable: true })
    @JoinColumn()
    response?: RequestResponse;
}