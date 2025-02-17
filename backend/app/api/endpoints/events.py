from typing import List
from fastapi import APIRouter

import backend.app.models as events_schema

router = APIRouter()

#sampleデータの登録
@router.get('/events', response_model=list[events_schema.Events])
async def list_events():
    return [events_schema.Events(id=1, name="rock in japan", venue="ひたちなか", date="2024-09-23")]

@router.post('/events',response_model=events_schema.Events)
async def create_events(events_body: events_schema.EventsCreate):
    return events_schema.Events(id=1,**events_body.dict())

@router.get('/events/{events_id}',response_model = events_schema.Events)
async def read_events(events_id: int):
    return events_schema.Events

@router.put('/events/{events_id}', response_model=events_schema.Events)
async def update_events(events_id: int, events_body:events_schema.EventsCreate ):
    return events_schema.Events(id=events_id, **events_body.dict())

@router.delete('/events/{events_id}', response_model=None)
async def delete_events(events_id: int):
    return